import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    const currentUser = {email: email};
    // console.log(currentUser);

    useEffect(() => {
        if(email) {
            fetch(`https://desolate-harbor-05396.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
                //store token
                // console.log('data', data)
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })
        }
    }, [currentUser, email]);

    return [token];
}

export default useToken;