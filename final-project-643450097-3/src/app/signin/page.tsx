// Add the "use client" directive at the top of the file
"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import styles from "./pagesignin.module.css";


export default function Page() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValue.username,
          password: formValue.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const authResponse = await signIn("credentials", {
            username: formValue.username,
            password: formValue.password,
            redirect: false,
            callbackUrl: "/",
          });

          if (authResponse?.ok) {
            router.push("/page");
          } else {

            console.error("Authentication failed");
          }
        } else {

          console.error("Authentication failed");
        }
      } else {
        
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      <body>
      <h1 className={styles.textcenter} >This is Signin Page</h1>
        <div className={styles.sectionsignin1}>
          <div className={styles.sectionsignin2}>
            <div className={styles.sectionsignin3}>
              <p className={styles.fontsize}>SignIn</p>
              <form onSubmit={onSubmit}>
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
                  <div className={styles.btncenter}>
                    <button style={{ margin: '30px'}} className="btn btn-primary" type="submit">
                      Signin
                    </button>
                    <Link href="/signup">
                      <button style={{ margin: '30px'}} className="btn btn-primary">Sign Up</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
