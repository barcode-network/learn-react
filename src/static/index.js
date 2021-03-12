export const content = {
    inputs: [
        {
            label: 'Username',
            name: 'username',
            type: 'text',
        },

        {
            label: 'Password',
            name: 'password',
            type: 'password',
        },
    
    ],

};

export const signin = async () => {
    return {
        id: '007',
        username: 'James Bond',
        email: 'bond@mi6.com',
        password: 'qwerty',
    }
}