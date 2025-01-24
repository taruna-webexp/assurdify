import ApiClient from "./apiClient";

const projectService = {
    getAllProjects: ({ offset, pageSize, sortBy, sortOrder, version }) => {
        return ApiClient.get("/projects/list", {
            params: {
                offset,
                pageSize,
                sortBy,
                sortOrder,
                version,
            },
        });
    },


    getFilteredProjects: ({ offset, auditStatus, projectName, contractAddress, tickerName, pageSize, sortBy, sortOrder, kycStatus, version }) => {
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
                version

            },
        });
    },
    getFeatureProject: ({ pageSize, featured }) => {
        return ApiClient.get("/projects/list", {
            params: { pageSize, featured }
        })

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
