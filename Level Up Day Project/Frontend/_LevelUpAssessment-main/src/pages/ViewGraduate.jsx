import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

import '../App.css';

const ViewGraduate = () => {
    const [grad, setgrad] = useState();
    const [age, setage] = useState();

    useEffect(() => {
        const hrefWOid = "http://localhost:3000/customer/"
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
                const data = await res.json()

                var today = new Date(Date.now())
                var dob = new Date(data.dateOfBirth)
                var ageCalc = today.getFullYear() - dob.getFullYear()

                setgrad(data)
                setage(ageCalc)
            }
        }).catch(err => {
            console.error(err)
        })
    }, []);

    const dateFormat = (dateVar) =>{
        var date = new Date(dateVar)

        var day = date.getDay()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        return day + "." + month + "." + year
    }

    return (
        <div>
            <Navbar />

            <div className="view-all-header">
                <p>LEVEL UP 2024</p>
                <div className="text-and-stripes">
                    <p>VIEW GRADUATE DETAILS</p>
                    <div className="stripes-div">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                    </div>
                </div>
            </div>

            {grad != null ?
                <div className="view-grad-content">
                    <div id="div1">
                        <p><b>{grad.firstName}</b> {grad.lastName}</p>
                    </div>

                    <div id="div2">
                        <div>
                            <p id="p1">PHONE NUMBER</p>
                            <p>{grad.phoneNumber == null ? "NA" : grad.phoneNumber}</p>
                        </div>

                        <div>
                            <p id="p1">EMAIL ADDRESS</p>
                            <p>{grad.emailAddress == null ? "NA" : grad.emailAddress}</p>
                        </div>

                        <div>
                            <p id="p1">AGE</p>
                            <p>{age}</p>
                        </div>
                    </div>

                    <hr />

                    <div id="div2">
                        <div>
                            <p id="p1">DATE CREATED</p>
                            <p>{dateFormat(grad.dateCreated)}</p>
                        </div>

                        <div>
                            <p id="p1">DATE EDITED</p>
                            <p>{grad.dateEdited == null ? "NA" : dateFormat(grad.dateEdited)}</p>
                        </div>

                    </div>

                </div>
                :
                <></>
            }

        </div>
    )
}

export default ViewGraduate;