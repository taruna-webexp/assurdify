import { Pagination } from '@mui/material';
import React from 'react';
export default function ProjectPagination({ count, page, onChange }) {
    console.log("count", count);
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            color="primary"
            renderItem={(item) => {
                if (count > 17) {
                    if (item.type === "previous" && page > 1) {
                        return (
                            <button
                                variant="contained"
                                onClick={() => item.onClick()}
                                className={`px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                Previous
                            </button>
                        );
                    }
                    if (item.type === "next") {
                        return (
                            <button
                                variant="contained"
                                onClick={() => item.onClick()}
                                className={`px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                Next
                            </button>
                        );
                    }
                }
                return null; // Hide other pagination items 
            }}
        />
    );
}