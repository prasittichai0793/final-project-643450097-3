"use client"; // Add the "use client" directive at the top of the file

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

import 'bootstrap/dist/css/bootstrap.min.css'; // นำเข้า Bootstrap CSS

export default function App() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios
            .get("https://final-project-api.prasiththichay2.repl.co/products")
            .then((response) => {
                setData(response.data);
            });
    }, []);

    const addToTable = (item) => {
        setSelectedItems([...selectedItems, { ...item, quantity: 1 }]); // เพิ่ม property quantity เป็น 1
    };

    const editItem = (index) => {
        const updatedItems = [...selectedItems];
        const item = updatedItems[index];
        if (item.editing) {
            item.editing = false; // สิ้นสุดการแก้ไข
        } else {
            item.editing = true; // เริ่มการแก้ไข
        }
        setSelectedItems(updatedItems);
    };

    const increaseQuantity = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity++;
        setSelectedItems(updatedItems);
    };

    const decreaseQuantity = (index) => {
        const updatedItems = [...selectedItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity--;
        }
        setSelectedItems(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
    };



    return (
        <div className={styles.App}>
            <div className={styles.row}>
                {data.map((val, idx) => (
                    <div key={idx} className={styles.col}>
                        <p>{val.name}</p>
                        <div>
                            <img src={val.image} alt={val.name} />
                        </div>
                        <div>
                            <span>{val.company}</span>
                        </div>
                        <div>
                            <button className={styles.button} onClick={() => addToTable(val)}>เลือก</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">ชื่อ</th>
                            <th scope="col">รุ่น</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">แก้ไข</th>
                            <th scope="col">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((item, idx) => (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.company}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button className={styles.buttonedit} onClick={() => editItem(idx)}>
                                        {item.editing ? 'บันทึก' : 'แก้ไข'}
                                    </button>
                                    {item.editing && (
                                        <button className={styles.buttonedit} onClick={() => increaseQuantity(idx)}>เพิ่ม</button>
                                    )}
                                    {item.editing && (
                                        <button className={styles.buttondelete} onClick={() => decreaseQuantity(idx)}>ลด</button>
                                    )}
                                </td>
                                <td>
                                    <button className={styles.buttondelete} onClick={() => removeItem(idx)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
