"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignin = () => {
    router.push("/signin");
  };

  const handleSignout = async () => {
    await signOut();
    router.push("/signout");
  };

  if (session && session.user) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 style={{ margin: '0', marginRight: '10px' }}>{session.user.name}</h4>
          <button className="btn btn-danger" onClick={handleSignout}>
            SignOut
          </button>
        </div>
      </>
    );
  }



  return (
    <>
      <button onClick={handleSignin} className="btn btn-primary">
        SignIn
      </button>

    </>
  );
};

export default SigninButton;
