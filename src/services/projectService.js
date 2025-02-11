import ApiClient from "./apiClient";

const projectService = {
  getAllProjects: ({ ...data }) => {
    return ApiClient.get("/projects/list", {
      params: { ...data },
    });
  },

  getFeatureProject: ({ pageSize, featured }) => {
    return ApiClient.get("/projects/list", {
      params: { pageSize, featured },
    });
  },
  getSingleProject: ({ slug, version }) => {
    return ApiClient.get("projects/detail", {
      params: {
        slug,
        version,
      },
    });
  },
};

export default projectService;
