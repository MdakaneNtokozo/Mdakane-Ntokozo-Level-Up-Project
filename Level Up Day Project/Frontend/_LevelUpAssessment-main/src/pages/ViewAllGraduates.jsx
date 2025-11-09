import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

import '../App.css';
import { useNavigate } from "react-router-dom";

const ViewAllGraduates = () => {
    const [graduates, setgraduates] = useState([]);
    const [deletePopUp, setdeletePopUp] = useState(false);
    const [selectedGrad, setselectedGrad] = useState(-1);
    const navigate = useNavigate()

    useEffect(() => {
        var api_call = "http://localhost:5298/getGrads"

        fetch(api_call, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.ok) {
                setgraduates(await res.json())
            }
        }).catch(err => {
            console.error(err)
        })
    }, []);

    const viewMode = (id) => {
        navigate("/customer/" + id)
    }

    const updateGrad = (id) => {
        navigate("/update/" + id)
    }

    const deleteGrad = (id) => {
        setdeletePopUp(!deletePopUp)
        var selected = graduates.find(g => g.guid === id)
        setselectedGrad(selected)
    }

    const deleteSelectedGrad = () => {
        var api_call = "http://localhost:5298/deleteGrad/" + selectedGrad.guid

        fetch(api_call, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            alert("Graduate has been deleted")
            setselectedGrad(null)
        })
    }

    return (
        <div>
            <Navbar />

            <div className="view-all-header">
                <p>LEVEL UP 2024</p>
                <div className="text-and-stripes">
                    <p>GRADUATE LIST</p>
                    <div className="stripes-div">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                    </div>
                </div>
            </div>

            <section className="md:px-12 px-4 mt-6">
                <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden">
                    <thead className="bg-white uppercase micro-5 text-3xl">
                        <tr>
                            <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                                <div className="relative flex justify-start items-center">
                                    Full Name
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3 md:block hidden" alt="black-rocket" />
                                </div>
                            </th>
                            <th className="md:py-2 py-1 md:px-8 px-4 md:block hidden">
                                <div className="relative flex justify-start items-center">
                                    Contact Details
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3" alt="black-rocket" />
                                </div>
                            </th>
                            <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {graduates.length !== 0 ?
                            graduates.map((grad, idx) => {
                                if (grad.isDeleted === false) {
                                    return <tr key={idx}>
                                        {/* full name */}
                                        <td className="md:py-4 py-2 md:px-8 px-4">{grad.firstName} {grad.lastName}</td>
                                        {/* contact details */}
                                        <td className="md:py-4 py-2 md:px-8 px-4 md:block hidden" style={grad.emailAddress == null && grad.phoneNumber == null? {color:"red" : color:"white"}}>
											{grad.emailAddress != null ? grad.emailAddress : (grad.phoneNumber != null ? grad.phoneNumber : "Field empty")}
										</td>
                                        {/* actions */}
                                        <td className="md:py-4 py-2 md:px-8 px-4 action-div">
                                            <button className="viewButton" onClick={() => viewMode(grad.guid)}>View mode</button>
                                            <button className="updateButton" onClick={() => updateGrad(grad.guid)}>Update</button>
                                            <button className="deleteButton" onClick={() => deleteGrad(grad.guid)}>Delete</button>
                                        </td>
                                    </tr>
                                }

                            })
                            :
                            <p>No graduates added</p>
                        }
                    </tbody>
                </table>

                {deletePopUp === true ?
                    <div className="dim-background" onClick={() => setdeletePopUp(!deletePopUp)}>
                        <div className="delete-grad-container">
                            <div id="div1">
                                <p id="p1"><b>DELETE GRADUATE</b></p>
                                <p id="p2"><b>DELETE</b></p>
                                <p id="p3"><b>{selectedGrad.firstName}</b> {selectedGrad.lastName}</p>
                            </div>

                            <div id="div2">
                                <button className="deleteButton" onClick={() => deleteSelectedGrad()}>DELETE</button>
                                <button className="updateButton" onClick={() => setdeletePopUp(!deletePopUp)}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                    : <></>
                }
            </section>
        </div>
    )
}

export default ViewAllGraduates;