
import { useState, useCallback } from "react";
import projectService from "@/services/projectService";
import { errorMsg } from "@/components/toaster/msg/toaster";
import dayjs from 'dayjs';
const recordsPerPage = 18;

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [offsetStack, setOffsetStack] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(null);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(false);
    const [featureData, setFeatureData] = useState([]);
    const [project, setSingleProject] = useState(null);
    const [singleProjecterror, setSingleProjectError] = useState(null);
    const [isSingleProjectLoading, setIsSingleProjectLoading] = useState(true);


    //Projects data desplay according to filter &Fetch all projects
    const fetchProjects = useCallback(async (filters, offset = "") => {
        const time = dayjs().format('HH:mm:ss');
        setLoading(true);
        try {
            const response = await projectService.getAllProjects({
                ...filters,
                pageSize: recordsPerPage,
                offset,
                sortBy: "kycDate",
                sortOrder: "desc",
                version: time,
            });
            setProjects(response.records);
            setCurrentOffset(response.offset);
            setTotalProjects(response.records.length);
            setOffsetStack([]); // Reset offset stack on new filters
        } catch (error) {
            errorMsg(error);
        } finally {
            setLoading(false);
        }
    }, []);


    // Featured Projects data fetch
    const fetchFeatureData = async () => {
        setLoading(true);
        try {
            const response = await projectService.getFeatureProject({
                pageSize: 18,
                featured: "Yes",
            });
            setFeatureData(response?.records);
        } catch (error) {
            errorMsg(error);
        } finally {
            setLoading(false);
        }
    };

    //Signle Project detail data fetch

    const fetchSingleProject = async (slug) => {
        try {
            const response = await projectService.getSingleProject({ slug });
            response ? setSingleProject(response) : setSingleProjectError("NO RECORD FOUND");
        } catch (error) {
            errorMsg(error);
            setSingleProjectError("NO RECORD FOUND");
        } finally {
            setIsSingleProjectLoading(false);
        }
    };
    return {
        projects,
        totalProjects,
        loading,
        currentOffset,
        offsetStack,
        featureData,
        project,
        singleProjecterror,
        isSingleProjectLoading,
        fetchSingleProject,
        fetchFeatureData,
        setOffsetStack,
        fetchProjects,
    };
}
