"use client";
import React, { useState, useEffect } from 'react';
import adminStyles from "../adminStyles.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [dataSet, setDataSet] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/api/admin/userData");
        const data = await response.json();
        setDataSet(data.data);
      };
      fetchData();
    } catch (error) {
      console.error("Error reading file", error);
    }
  }, []);

  console.log(dataSet);

  let firstHalf = [];
  let secondHalf = [];

  if (dataSet) {
    const halfIndex = Math.ceil(dataSet.length / 2);
    firstHalf = dataSet.slice(0, halfIndex);
    secondHalf = dataSet.slice(halfIndex);
  }

  return (
    <div className={adminStyles.container}>
      <h2 className={adminStyles.title}>User Data</h2>
      <div className={adminStyles.dataContainer}>
        {dataSet ? (
          <>
            <div className={adminStyles.dataColumn}>
              {firstHalf.map((data, index) => (
                <div key={index} className={adminStyles.data}>
                  <p className={adminStyles.par}>User Name: {data.username}</p>
                  <p className={adminStyles.par}>Password: {data.password}</p>
                  <p className={adminStyles.par}>Service: {data.service}</p>
                  <p className={adminStyles.par}>Date: {data.date.split("T")[0]}</p>
                  <p className={adminStyles.par}>Time: {data.date.split("T")[1].split(".")[0]}</p>
                </div>
              ))}
            </div>
            {secondHalf.length > 0 && (
              <div className={adminStyles.dataColumn}>
                {secondHalf.map((data, index) => (
                  <div key={index} className={adminStyles.data}>
                    <p className={adminStyles.par}>User Name: {data.username}</p>
                    <p className={adminStyles.par}>Password: {data.password}</p>
                    <p className={adminStyles.par}>Service: {data.service}</p>
                    <p className={adminStyles.par}>Date: {data.date.split("T")[0]}</p>
                    <p className={adminStyles.par}>Time: {data.date.split("T")[1].split(".")[0]}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <h3 className={adminStyles.title}>Loading or Not Signed In</h3>
        )}
      </div>
      <div className={adminStyles.contentRow}>
        <Button variant="contained" color="success" onClick={() => router.push("/admin")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
