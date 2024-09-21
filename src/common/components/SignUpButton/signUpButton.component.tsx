import { useNavigate } from 'react-router-dom'
import './style.css'

const SignUpButtonComponent = () => {
    const goTo = useNavigate()

    const handleClick = () => {
        goTo('/signup')
    }

    return (
        <button onClick={handleClick} className="signUp-button" >Sign Up</button>
    )
}

export default SignUpButtonComponent