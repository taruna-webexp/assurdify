import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';
import React from 'react';

export default function ProjectPagination({ count, page, onChange }) {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            color="primary"
            renderItem={(item) => {
                // Only show buttons if count > 17
                if (count > 17) {
                    // Render "Previous" button if not on the first page
                    if (item.type === "previous" && page > 1) {
                        return (
                            <button
                                variant="contained"
                                onClick={() => item.onClick()}
                                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} /> Previous
                            </button>
                        );
                    }

                    // Render "Next" button only if not on the last page
                    if (item.type === "next" && page < count) {
                        return (
                            <button
                                variant="contained"
                                onClick={() => item.onClick()}
                                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                Next <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        );
                    }
                }

                // Return null for other cases
                return null;
            }}
        />
    );
}
