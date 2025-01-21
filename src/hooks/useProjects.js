
import { useState, useCallback } from "react";
import projectService from "@/services/projectService";
import { errorMsg } from "@/components/toaster/msg/toaster";
const recordsPerPage = 18;

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [offsetStack, setOffsetStack] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(null);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchProjects = useCallback(async (offset = "") => {
        setLoading(true);
        try {
            const response = await projectService.getAllProjects({
                offset,
                pageSize: recordsPerPage,
                sortBy: "kycDate",
                sortOrder: "desc",
            });
            setProjects(response.records);
            setTotalProjects(response.records.length);
            setCurrentOffset(response.offset);
        } catch (error) {
            errorMsg(error);
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchFilteredProjects = useCallback(async (filters) => {
        setLoading(true);
        try {
            const response = await projectService.getFilteredProjects({
                ...filters,
                pageSize: recordsPerPage,
                offset: "",
                sortBy: "kycDate",
                sortOrder: "desc",
            });
            setProjects(response.records);
            setCurrentOffset(response.offset);
            setTotalProjects(response.records.length);
            setOffsetStack([]); // Reset offset stack on new filters
        } catch (error) {
            console.error("Error fetching filtered projects:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        projects,
        totalProjects,
        loading,
        currentOffset,
        offsetStack,
        setOffsetStack,
        fetchProjects,
        fetchFilteredProjects,
    };
}
