import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star,
  TrendingUp
} from "lucide-react";
import EventCard, { Event } from "./EventCard";
import { cn } from "@/lib/utils";

// Sample events data (same as admin but from student perspective)
import hackathonImage from "@/assets/hackathon-event.jpg";
import workshopImage from "@/assets/workshop-event.jpg";
import festivalImage from "@/assets/festival-event.jpg";

const StudentPortal = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'registered' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set(['2']));

  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Spring Hackathon 2024',
      description: 'Build innovative solutions in 48 hours. Win prizes worth $10,000! Teams of 4 members max.',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Computer Science Building',
      category: 'hackathon',
      attendees: 156,
      maxAttendees: 200,
      status: 'upcoming',
      image: hackathonImage,
      organizer: 'Tech Club'
    },
    {
      id: '2',
      title: 'React Workshop Series',
      description: 'Learn modern React development with hooks, context, and best practices. Hands-on coding experience.',
      date: '2024-03-20',
      time: '02:00 PM',
      location: 'Lab 301',
      category: 'workshop',
      attendees: 45,
      maxAttendees: 50,
      status: 'upcoming',
      image: workshopImage,
      organizer: 'CS Department'
    },
    {
      id: '3',
      title: 'Spring Festival 2024',
      description: 'Annual campus celebration with music, food, and entertainment. Join us for an unforgettable experience.',
      date: '2024-02-28',
      time: '06:00 PM',
      location: 'Main Quadrangle',
      category: 'festival',
      attendees: 890,
      maxAttendees: 1000,
      status: 'completed',
      image: festivalImage,
      organizer: 'Student Council'
    },
    {
      id: '4',
      title: 'AI & Machine Learning Seminar',
      description: 'Industry experts share insights on AI trends and career opportunities in machine learning.',
      date: '2024-03-25',
      time: '03:30 PM',
      location: 'Auditorium Hall',
      category: 'tech-talk',
      attendees: 78,
      maxAttendees: 120,
      status: 'upcoming',
      image: workshopImage,
      organizer: 'AI Society'
    }
  ];

  const studentStats = [
    { icon: Calendar, label: "Events Attended", value: "12", color: "text-primary" },
    { icon: Clock, label: "Hours Learned", value: "48", color: "text-accent" },
    { icon: Star, label: "Certificates", value: "8", color: "text-success" },
    { icon: TrendingUp, label: "Skill Points", value: "245", color: "text-info" }
  ];

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'registered', label: 'My Events' },
    { id: 'completed', label: 'Completed' }
  ];

  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeFilter) {
      case 'upcoming':
        return matchesSearch && event.status === 'upcoming';
      case 'registered':
        return matchesSearch && registeredEvents.has(event.id);
      case 'completed':
        return matchesSearch && event.status === 'completed';
      default:
        return matchesSearch;
    }
  });

  const handleRegister = (eventId: string) => {
    setRegisteredEvents(prev => new Set([...prev, eventId]));
    // In a real app, this would make an API call
  };

  const handleViewDetails = (eventId: string) => {
    alert(`View details for event ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Student Portal</h1>
          <p className="text-muted-foreground text-lg">
            Discover, register, and participate in amazing campus events
          </p>
        </div>

        {/* Student Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {studentStats.map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="animate-scale-in">
              <CardContent className="p-4 text-center">
                <Icon className={cn("w-6 h-6 mx-auto mb-2", color)} />
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(({ id, label }) => (
              <Button
                key={id}
                variant={activeFilter === id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(id as any)}
                className={cn(
                  "transition-all duration-200",
                  activeFilter === id && "shadow-soft"
                )}
              >
                {label}
                {id === 'registered' && registeredEvents.size > 0 && (
                  <Badge className="ml-2 bg-accent text-accent-foreground">
                    {registeredEvents.size}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge className="campus-badge">🔥 Trending: AI Workshop</Badge>
          <Badge className="campus-badge">⚡ Quick Register Available</Badge>
          <Badge className="campus-badge">🎉 New: Spring Events</Badge>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EventCard
                event={event}
                onRegister={handleRegister}
                onViewDetails={handleViewDetails}
                isRegistered={registeredEvents.has(event.id)}
              />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find events
            </p>
          </div>
        )}

        {/* Registered Events Summary */}
        {registeredEvents.size > 0 && (
          <div className="mt-12 p-6 glass-card">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="text-lg font-semibold">Your Registered Events</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              You're registered for {registeredEvents.size} upcoming event{registeredEvents.size !== 1 ? 's' : ''}. 
              Don't forget to mark your calendar!
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(registeredEvents).map(eventId => {
                const event = sampleEvents.find(e => e.id === eventId);
                return event ? (
                  <Badge key={eventId} className="campus-badge">
                    📅 {event.title}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;