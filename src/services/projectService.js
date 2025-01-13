import ApiClient from "./apiClient";

const projectService = {
    getAllProjects: ({ offset, pageSize, sortBy, sortOrder }) => {
        return ApiClient.get("/projects/list", {
            params: {
                offset,
                pageSize,
                sortBy,
                sortOrder,
            },
        });
    },


    getFilteredProjects: ({ offset, auditStatus, projectName, contractAddress, tickerName, pageSize, sortBy, sortOrder, kycStatus, }) => {
        return ApiClient.get("/projects/list", {
            params: {
                kycStatus,
                auditStatus,
                projectName,
                contractAddress,
                tickerName,
                offset,
                pageSize,
                sortBy,
                sortOrder,

            },
        });
    },

    getSingleProject: ({ slug }) => {
        return ApiClient.get("projects/detail", {
            params: {
                slug,


            },
        });
    }
};

export default projectService;
