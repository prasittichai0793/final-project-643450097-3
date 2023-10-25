"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import styles from "./pagesignup.module.css";

export default function SignupPage() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    if (response.ok) {
      console.log("User created successfully");
      setSignupSuccess(true);
    } else {
      const data = await response.json();
      if (data.error === "Username is already in use") {
        console.error("Username is already in use");
      } else {
        console.error("User creation failed");
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
  }
};

  return (
    <>
      <body>
      <h1 className={styles.textcenter} >This is Signup Page</h1>
        <div className={styles.sectionsignin1}>
          <div className={styles.sectionsignin2}>
            <div className={styles.sectionsignin3}>
            <p className={styles.fontsize}>SignUp</p>
              {signupSuccess ? (
                <div>
                  <p>Signup successful! You can now sign in.</p>
                  <div className={styles.btncenter}>
                    <Link href="/signin">
                      <button style={{ margin: '30px'}} className="btn btn-primary">Sign In</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.bold}>
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formValue.username}
                        onChange={handleChange}
                      />
                      <label htmlFor="username">Username</label>
                    </div>

                    <br></br>

                    <div>
                      <input
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <br></br>

                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formValue.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className={styles.btncenter}>
                      <button style={{ margin: '30px'}} className="btn btn-primary" type="submit">
                        Sign Up
                      </button>
                      <Link href="/signin">
                        <button style={{ margin: '30px'}} className="btn btn-primary">Sign In</button>
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </body>
    </>
  );
}