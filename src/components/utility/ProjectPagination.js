import React from 'react';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';

export default function ProjectPagination({ count, page, onChange }) {
    // Function to scroll to the top
    const handleScroll = () => {
        // Get the target element by its ID and scroll to it
        const targetElement = document.getElementById('target-section');
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Pagination
            count={count}
            page={page}
            onChange={(event, value) => {
                onChange(event, value); // Handle page change
                handleScroll(); // Scroll to the top after page change
            }}
            color="primary"
            renderItem={(item) => {
                console.log("pagination", item);

                // Render "Previous" button if not on the first page
                if (item.type === 'previous' && page > 1) {
                    return (
                        <button
                            onClick={() => {
                                item.onClick(); // Handle Pagination behavior
                                handleScroll(); // Scroll to the top
                            }}
                            className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} /> Previous
                        </button>
                    );
                }

                // Render "Next" button if not on the last page
                if (item.type === 'next' && page < count) {
                    return (
                        <button
                            onClick={() => {
                                item.onClick(); // Handle Pagination behavior
                                handleScroll(); // Scroll to the top
                            }}
                            className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-white ${item.disabled
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            Next <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    );
                }

                // Render null for other pagination types
                return null;
            }}
        />
    );
}
