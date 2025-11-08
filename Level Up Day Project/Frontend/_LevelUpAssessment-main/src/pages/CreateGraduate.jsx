import React, { useRef } from "react";
import Navbar from "../components/navbar";
import '../App.css';
import { useNavigate } from "react-router-dom";

const CreateGraduate = () => {
    const nameRef = useRef()
    const surnameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const dobRef = useRef()
    const navigate = useNavigate()

    const createGrad = () => {
        const name = nameRef.current.value
        const surname = surnameRef.current.value
        const email = emailRef.current.value
        const contact = contactRef.current.value
        const dob = dobRef.current.value

        if (name !== "" &&
            surname !== "" &&
            dob !== ""
        ) {
            const datecreated = new Date(Date.now())

            var newGrad = {
                "guid": 0,
                "firstName": name,
                "lastName": surname,
                "emailAddress": email === "" ? null : email,
                "phoneNumber": contact === "" ? null: contact,
                "dateOfBirth": dob,
                "dateCreated": datecreated,
            }

            console.log(newGrad)

            var api_call = "http://localhost:5298/createGrad"
            fetch(api_call, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGrad)
            }).then(async res => {
                if (res.ok) {
                    navigate("/viewall")
                } else {
                    alert(await res.text())
                }
            })
        }
    }

    return (
        <div>
            <Navbar />

            <div className="view-all-header">
                <p>LEVEL UP 2024</p>
                <div className="text-and-stripes" >
                    <p>CREATE GRADUATE</p>
                    <div className="stripes-div">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                    </div>
                </div>
            </div>

            <div className="create-grad-form">
                {/* Left side of the form */}
                <div className="create-grad-form-left">
                    <p>NAME:</p>
                    <input type="text" ref={nameRef}></input>

                    <p>PHONE NUMBER:</p>
                    <input type="text" ref={contactRef}></input>

                    <p>DATE OF BIRTH:</p>
                    <input type="date" ref={dobRef}></input>
                </div>

                {/* Right side of the form */}
                <div className="create-grad-form-right">
                    <p>LAST NAME:</p>
                    <input type="text" ref={surnameRef}></input>

                    <p>EMAIL:</p>
                    <input type="email" ref={emailRef}></input>

                    <button className="red-button" onClick={() => createGrad()}>
                        <div>
                            <p>ADD NEW GRADUATES</p>
                            <img src=".\assets\icons\rocket_white.webp" alt="white-rocket"></img>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreateGraduate;