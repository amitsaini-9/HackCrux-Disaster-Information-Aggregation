import { useState, useEffect } from 'react';

interface EventLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string | null;
  region: string | null;
  city: string | null;
}

interface EventSource {
  id: string;
  sourceType: string;
  url: string | null;
  content: string | null;
  author: string | null;
  timestamp: Date;
  credibility: number;
  eventId: string;
}

export interface DisasterEvent {
  id: string;
  title: string;
  description: string | null;
  disasterType: string;
  severity: string;
  status: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  locationId: string;
  location: EventLocation;
  sources: EventSource[];
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface EventsResponse {
  events: DisasterEvent[];
  pagination: Pagination;
}

interface EventFilters {
  type?: string;
  severity?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function useEvents(filters: EventFilters = {}) {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type);
        if (filters.severity) params.append('severity', filters.severity);
        if (filters.status) params.append('status', filters.status);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        // Fetch data from API
        const response = await fetch(`/api/events?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  return { data, isLoading, error };
}

export function useEvent(id: string) {
  const [data, setData] = useState<DisasterEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data from API
        const response = await fetch(`/api/events/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  return { data, isLoading, error };
}