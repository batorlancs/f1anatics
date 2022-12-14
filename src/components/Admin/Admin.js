import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

// --------------------------------------------------------------------------------------------------------------------------------
// This page can only be accessed by admins (in admin.json)
// --------------------------------------------------------------------------------------------------------------------------------

function Admin() {
    return (
        <div className="admin">
            <div className="admin-titlebox">
                <div className="admin-title">
                    <h1>ADMIN PAGE</h1>
                    <p>Here you can create or upload blogs, when signed in as admin.</p>
                </div>
            </div>
            <div className="admin-linkbox">
                <Link className="admin-linklink" to="create" >
                    <div className="admin-link">
                        <h2>CREATE A NEW BLOG</h2>
                    </div>
                </Link>
                <Link className="admin-linklink" to="delete" >
                    <div className="admin-link">
                        <h2>DELETE OR UPDATE A BLOG</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Admin;