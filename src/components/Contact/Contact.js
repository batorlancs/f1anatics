import React, { useState, useRef } from "react";
import "./Contact.css";
import MailIcon from "../../pic/mail.svg";
import InstaIcon from "../../pic/socialicons/instagram.png";
import TimeIcon from "../../pic/time.svg";
import emailjs from "@emailjs/browser";


function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorType, setErrorType] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || message === "") {
            setErrorMsg("Please fill out all forms");
            setErrorType("-yellow");

        } else if ( !(/\S+@\S+\.\S+/.test(email)) ) {
            setErrorMsg("Email is not valid");
            setErrorType("-yellow");

        } else if (submitted) {
            setErrorMsg("You already submitted your message.")
            setErrorType("-yellow");
            
        } else {
            emailjs.sendForm('service_bgk8uir', 'template_k2rubuo', form.current, '9_NI2V_0kP0kR4mjz')
                .then((result) => {
                    console.log(result.text);
                    setErrorMsg("Message sent! We will get back to you soon.");
                    setErrorType("-green");
                    setSubmitted(true);
                }, (error) => {
                    console.log(error.text);
                    setErrorMsg("Something went wrong. Try again later.");
                    setErrorType("-red");
                });
        }

    };

    return (
        <div className="contact">
            <div className="contact-box">
                <h1>Contact us</h1>
                <p>Feel free to contact us any time. We will get back to you as soon as we can.</p>
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    <input className="contact-form-text" placeholder="Name" type="text" name="user_name" onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                    <input className="contact-form-text" placeholder="Email" type="email" name="user_email" onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <input className="contact-form-text" placeholder="Message" type="text" name="message" onChange={(e) => {
                        setMessage(e.target.value);
                    }}/>
                    {errorMsg !== "" && <h3 className={(`contact-form-error${errorType}`)}>{errorMsg}</h3>}
                    <input className="contact-form-submit" type="submit" value="Send"></input>
                </form>
            </div>
            <div className="contact-shape"></div>
            <div className="contact-details">
                <h1>Info</h1>
                <div className="contact-details-row">
                    <img src={MailIcon} className="contact-details-pic-white"></img>
                    <h2>batorgergely3@gmail.com</h2>
                </div>
                <div className="contact-details-row">
                    <img src={InstaIcon} className="contact-details-pic-black"></img>
                    <h2>@f1anatics dm</h2>
                </div>
                <div className="contact-details-row">
                    <img src={TimeIcon} className="contact-details-pic-white"></img>
                    <h2>any time</h2>
                </div>
            </div>
        </div>
    )
}

export default Contact;