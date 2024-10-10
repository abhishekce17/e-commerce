import toast from 'react-hot-toast';
export const notify = (msg, status) => {
    toast[status](msg,
        {
            duration: 2500,
            iconTheme: {
                primary: '#6947BF',
                secondary: '#fff',
            }
        });
}