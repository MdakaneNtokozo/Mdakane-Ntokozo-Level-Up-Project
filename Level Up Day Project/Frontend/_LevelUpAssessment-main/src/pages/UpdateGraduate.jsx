import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";

import '../App.css';
import { useNavigate } from "react-router-dom";

const UpdateGraduate = () => {
    const nameRef = useRef()
    const surnameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const dobRef = useRef()
    const navigate = useNavigate()
    const [grad, setgrad] = useState(null);

    useEffect(() => {
        const hrefWOid = "http://localhost:3000/update/"
        const href = document.URL
        const id = href.substring(hrefWOid.length, href.length)

        var api_call = "http://localhost:5298/getGrad/" + id
        fetch(api_call, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.ok) {
                const gradData = await res.json()

                nameRef.current.value = gradData.firstName
                surnameRef.current.value = gradData.lastName
                emailRef.current.value = gradData.emailAddress === null ? "" : gradData.emailAddress
                contactRef.current.value = gradData.phoneNumber === null ? "" : gradData.phoneNumber
                dobRef.current.value = gradData.dateOfBirth.substring(0, 10)

                setgrad(gradData)
            }
        }).catch(err => {
            console.error(err)
        })
 
    }, []);

    const updateGrad = () => {
        const name = nameRef.current.value
        const surname = surnameRef.current.value
        const email = emailRef.current.value
        const contact = contactRef.current.value
        const dob = dobRef.current.value

        if (name !== "" &&
            surname !== "" &&
            email !== "" &&
            contact !== "" &&
            dob !== ""
        ) {
            const dateEdited = new Date(Date.now())

            var updateGrad = {
                "guid": grad.guid,
                "firstName": name,
                "lastName": surname,
                "emailAddress": email,
                "phoneNumber": contact,
                "dateOfBirth": dob,
                "dateCreated": grad.dateCreated,
                "dateEdited": dateEdited,
                "isDeleted": false
            }

            console.log(updateGrad)

            var api_call = "http://localhost:5298/updateGrad"
            fetch(api_call, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateGrad)
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
                    <p>UPDATE GRADUATE</p>
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

                    <button className="red-button" onClick={() => updateGrad()}>
                        <div>
                            <p>Update GRADUATES</p>
                            <img src="\assets\icons\rocket_white.webp" alt="white-rocket"></img>
                        </div>
                    </button>
                </div>

            </div>
        </div>

    )
}

export default UpdateGraduate;