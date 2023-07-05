// Sheet.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from './Navbar';
import Grid from './Grid';

const Sheet = () => {
    const [sheetData, setSheetData] = useState([]);

    useEffect(() => {
        // Load saved data from AsyncStorage when component mounts
        loadSheetData();
    }, []);

    const handleInputChange = (rowIndex, colIndex, value) => {
        const updatedData = [...sheetData];
        updatedData[rowIndex][colIndex] = value;
        setSheetData(updatedData);
        saveSheetData(updatedData);
    };

    const handleDownload = () => {
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xff;
        }
        const data = [view];
        const blob = new Blob(data, { type: 'application/octet-stream' });
        saveAs(blob, 'sheet.xlsx');
    };

    const loadSheetData = async () => {
        try {
            const data = await AsyncStorage.getItem('sheetData');
            if (data !== null) {
                setSheetData(JSON.parse(data));
            } else {
                // Initialize empty sheet data
                const initialData = Array.from({ length: 100 }, () =>
                    Array.from({ length: 25 }, () => '')
                );
                setSheetData(initialData);
            }
        } catch (error) {
            console.error('Error loading sheet data:', error);
        }
    };

    const saveSheetData = async (data) => {
        try {
            await AsyncStorage.setItem('sheetData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving sheet data:', error);
        }
    };

    return (
        <div>
            <Navbar handleDownload={handleDownload} />
            <Grid sheetData={sheetData} handleInputChange={handleInputChange} />
        </div>
    );
};

export default Sheet;
