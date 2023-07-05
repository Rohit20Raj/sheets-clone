// Grid.js
import React from 'react';
import '../css/style.css';

const Grid = ({ sheetData, handleInputChange }) => {
    return (
        <div className="table">
            <table className='grid-container'>
                <thead>
                    <tr>
                        <th></th>
                        {sheetData.length > 0 &&
                            sheetData[0].map((_, colIndex) => (
                                <th key={colIndex}>{colIndex + 1}</th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {sheetData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th>{rowIndex + 1}</th>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) =>
                                            handleInputChange(rowIndex, colIndex, e.target.value)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;
