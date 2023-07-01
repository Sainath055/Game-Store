

export default function platformLogo(val) {
    const windows = <svg className='w-[20px] h-[20px]'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path fill="currentColor" d="M14.814.111A.5.5 0 0 1 15 .5V7H7V1.596L14.395.01a.5.5 0 0 1 .42.1ZM6 1.81L.395 3.011A.5.5 0 0 0 0 3.5V7h6V1.81ZM0 8v4.5a.5.5 0 0 0 .43.495l5.57.796V8H0Zm7 5.934l7.43 1.061A.5.5 0 0 0 15 14.5V8H7v5.934Z"/></svg>
    const playstation = <svg className='w-[24px] h-[23px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M399.77 203c-.8-17.1-3.3-34.5-10.8-50.1a82.45 82.45 0 0 0-16.5-23.2a105.59 105.59 0 0 0-21.3-16.3c-17.1-10.2-37.5-17-84.4-31S192 64 192 64v358.3l79.9 25.7s.1-198.8.1-299.5v-3.8c0-9.3 7.5-16.8 16.1-16.8h.5c8.5 0 15.5 7.5 15.5 16.8V278c11 5.3 29.2 9.3 41.8 9.1a47.79 47.79 0 0 0 24-5.7a49.11 49.11 0 0 0 18.4-17.8a78.64 78.64 0 0 0 9.9-27.3c1.87-10.8 1.97-22.1 1.57-33.3ZM86.67 357.8c27.4-9.8 89.3-29.5 89.3-29.5v-47.2s-76.5 24.8-111.3 37.1c-8.6 3.1-17.3 5.9-25.7 9.5c-9.8 4.1-19.4 8.7-28.1 14.8a26.29 26.29 0 0 0-9.2 10.1a17.36 17.36 0 0 0-.5 13.6c2 5.1 5.8 9.3 10.1 12.6c7.8 5.9 17.1 9.5 26.4 12.2a262.42 262.42 0 0 0 88.4 13.3c14.5-.2 36-1.9 50-4.4v-42s-11 2.5-41.3 12.5c-4.6 1.5-9.2 3.3-14 4.3a104.87 104.87 0 0 1-21.6 2.2c-6.5-.3-13.2-.7-19.3-3.1c-2.2-1-4.6-2.2-5.5-4.6c-.8-2 .3-4 1.7-5.4c2.8-2.9 6.8-4.5 10.6-6Z"/><path fill="currentColor" d="M512 345.9c-.1-6-3.7-11.2-7.9-15c-7.1-6.3-15.9-10.3-24.7-13.5c-5.5-1.9-9.3-3.3-14.7-5c-25.2-8.2-51.9-11.2-78.3-11.3c-8 .3-23.1.5-31 1.4c-21.9 2.5-67.3 15.4-67.3 15.4v48.8s67.5-21.6 96.5-31.8a94.43 94.43 0 0 1 30.3-4.6c6.5.2 13.2.7 19.4 3.1c2.2.9 4.5 2.2 5.5 4.5c.9 2.6-.9 5-2.9 6.5c-4.7 3.8-10.7 5.3-16.2 7.4c-41 14.5-132.7 44.7-132.7 44.7v47s117.2-39.6 170.8-58.8c8.9-3.3 17.9-6.1 26.4-10.4c7.9-4 15.8-8.6 21.8-15.3a19.74 19.74 0 0 0 5-13.1Z"/></svg>
    const xbox = <svg className='w-[20px] h-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M7.202 15.967a7.987 7.987 0 0 1-3.552-1.26c-.898-.585-1.101-.826-1.101-1.306c0-.965 1.062-2.656 2.879-4.583C6.459 7.723 7.897 6.44 8.052 6.475c.302.068 2.718 2.423 3.622 3.531c1.43 1.753 2.088 3.189 1.754 3.829c-.254.486-1.83 1.437-2.987 1.802c-.954.301-2.207.429-3.239.33Zm-5.866-3.57C.589 11.253.212 10.127.03 8.497c-.06-.539-.038-.846.137-1.95c.218-1.377 1.002-2.97 1.945-3.95c.401-.417.437-.427.926-.263c.595.2 1.23.638 2.213 1.528l.574.519l-.313.385C4.056 6.553 2.52 9.086 1.94 10.653c-.315.852-.442 1.707-.306 2.063c.091.24.007.15-.3-.319Zm13.101.195c.074-.36-.019-1.02-.238-1.687c-.473-1.443-2.055-4.128-3.508-5.953l-.457-.575l.494-.454c.646-.593 1.095-.948 1.58-1.25c.381-.237.927-.448 1.161-.448c.145 0 .654.528 1.065 1.104a8.372 8.372 0 0 1 1.343 3.102c.153.728.166 2.286.024 3.012a9.495 9.495 0 0 1-.6 1.893c-.179.393-.624 1.156-.82 1.404c-.1.128-.1.127-.043-.148ZM7.335 1.952c-.67-.34-1.704-.705-2.276-.803a4.171 4.171 0 0 0-.759-.043c-.471.024-.45 0 .306-.358A7.778 7.778 0 0 1 6.47.128c.8-.169 2.306-.17 3.094-.005c.85.18 1.853.552 2.418.9l.168.103l-.385-.02c-.766-.038-1.88.27-3.078.853c-.361.176-.676.316-.699.312a12.246 12.246 0 0 1-.654-.319Z"/></svg>
    
    if(val === 'Windows') {
        return windows
    }else if(val === 'Playstation') {
        return playstation
    }else {
        return xbox
    }
}