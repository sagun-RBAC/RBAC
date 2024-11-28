'use client'
// import { useNavigate } from "react-router-dom"; // Hook for navigation

import { auth, db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Features = () => {
//   const navigate = useNavigate();
    const router = useRouter();
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const checkRole = async () => {
      try {
       
        const user = auth.currentUser;
        console.log(user, "UUSER")
        if (!user) {
        //   navigate("/"); 
        //   window.location.href = '/'; 
        router.push("/");
          return;
        }

        const roleDoc = await getDoc(doc(db, "features", user.uid));
        console.log("user.uid", user.uid);  // return id
        console.log("roleDoc.data", roleDoc.data()); // return object

        
        if (roleDoc.exists() && roleDoc.data().featuresAllowed) {
            // it will store object
          setVisible(roleDoc.data().featuresAllowed);
        } else {
          alert("You do not have permission to access this page.");
        //   navigate("/");
        //   window.location.href = '/';
        router.push('/'); 
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        // navigate("/");
        // window.location.href = '/'; 
        router.push('/');
      }
    };

    checkRole();
  }, []);

  const onOptionSelectHandler = (value) => {
    // navigate(value);
    router.push(value);
  };
  return (
    <section className="features-list">
      {visible?.roles === "allowed" && (
        <div
          className="feature-item"
          onClick={() => onOptionSelectHandler("/dashboard/roles")}
        >
          Add Roles
        </div>
      )}
      {visible?.users === "allowed" && (
        <div
          className="feature-item"
          onClick={() => onOptionSelectHandler("/dashboard/users")}
        >
          Manage Users
        </div>
      )}
      {visible?.shop === "allowed" && (
        <div
          className="feature-item"
          onClick={() => onOptionSelectHandler("/dashboard/shop")}
        >
          Shop
        </div>
      )}
    </section>
  );
};

export default Features;
