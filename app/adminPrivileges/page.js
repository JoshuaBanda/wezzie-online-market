"use client";
import { useEffect, useState } from "react";
import { useUser } from "../userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles/admin.module.css";

const ManageInventory = () => {
  const { person } = useUser();
  const [role, setRole] = useState(""); // "administrator", "editor", "viewer"
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      if (!person?.userid) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "https://wonge-backend-k569.onrender.com/role-based-access-control/get-previleges",
          {
            user_id: person.userid,
          }
        );

        const userRole = response.data[0]?.role;
        console.log("User role:", userRole);
        setRole(userRole || "");
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [person?.userid]);

  useEffect(() => {
    if (!loading && !role) {
      console.log("routing back");
      router.back();
    }
  }, [loading, role]);

  if (!loading && !role) {
    return null; // avoid rendering while redirecting
  }

  return (
    <div style={{ position: "relative", marginTop: "10px", marginBottom: "100px" }}>
      {loading ? (
        <p>Loading role...</p>
      ) : (
        <>
          {role === "administrator" && (
            <div className={styles.optionsList}>
                <h3 className={styles.header}>
                    Administrator
                </h3>
                <p className={styles.paragraph}>
                    This page is restricted to administrators for security.
                </p>
              <div onClick={()=>{
                router.push("/postItems")
              }}>
                Upload Items
              </div>
              <div onClick={()=>{
                router.push("/editItems")
              }}>
                Edit Items
              </div>
            </div>
          )}

          {role === "editor" && (
            <>
              <p>You can edit products.</p>
            </>
          )}

          {role === "viewer" && <p>You can view only. No editing allowed.</p>}
        </>
      )}
    </div>
  );
};

export default ManageInventory;
