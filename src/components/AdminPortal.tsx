import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp,
  Search,
  Filter
} from "lucide-react";
import EventCard, { Event } from "./EventCard";
import { cn } from "@/lib/utils";

// Sample events data
import hackathonImage from "@/assets/hackathon-event.jpg";
import workshopImage from "@/assets/workshop-event.jpg";
import festivalImage from "@/assets/festival-event.jpg";

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Hackathon 2024',
    description: 'Build innovative solutions in 48 hours. Win prizes worth $10,000!',
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
    description: 'Learn modern React development with hooks, context, and best practices.',
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
    description: 'Annual campus celebration with music, food, and entertainment.',
    date: '2024-02-28',
    time: '06:00 PM',
    location: 'Main Quadrangle',
    category: 'festival',
    attendees: 890,
    maxAttendees: 1000,
    status: 'completed',
    image: festivalImage,
    organizer: 'Student Council'
  }
];

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'create'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const { toast } = useToast();

  // Form state for creating new events
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxAttendees: '',
    organizer: 'Admin'
  });

  const stats = [
    { icon: Calendar, label: "Total Events", value: "24", change: "+12%" },
    { icon: Users, label: "Total Attendees", value: "3,450", change: "+23%" },
    { icon: TrendingUp, label: "Completion Rate", value: "94%", change: "+5%" },
    { icon: BarChart3, label: "Avg. Satisfaction", value: "4.8", change: "+0.3" }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      maxAttendees: '',
      organizer: 'Admin'
    });
  };

  const handleCreateEvent = () => {
    // Validate form
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location || !formData.category || !formData.maxAttendees) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Validate category
    const validCategories = ['hackathon', 'workshop', 'festival', 'tech-talk'];
    const category = formData.category.toLowerCase();
    if (!validCategories.includes(category)) {
      toast({
        title: "Error",
        description: "Category must be one of: hackathon, workshop, festival, tech-talk",
        variant: "destructive"
      });
      return;
    }

    // Create new event
    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: category as 'hackathon' | 'workshop' | 'festival' | 'tech-talk',
      attendees: 0,
      maxAttendees: parseInt(formData.maxAttendees),
      status: 'upcoming',
      image: hackathonImage, // Default image
      organizer: formData.organizer
    };

    // Add to events list
    setEvents(prev => [newEvent, ...prev]);
    
    // Reset form and show success message
    resetForm();
    toast({
      title: "Success!",
      description: "Event created successfully",
    });

    // Switch to events tab to see the new event
    setActiveTab('events');
  };

  const handleEditEvent = (eventId: string) => {
    alert(`Edit event ${eventId}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    alert(`Delete event ${eventId}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'events', label: 'Manage Events', icon: Calendar },
    { id: 'create', label: 'Create Event', icon: Plus }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-lg">
            Manage campus events, track performance, and engage students
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200",
                activeTab === id
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, label, value, change }) => (
                <Card key={label} className="animate-scale-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold text-primary">{value}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Icon className="w-8 h-8 text-primary/60 mb-2" />
                        <Badge className={cn(
                          "text-xs",
                          change.startsWith('+') ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                        )}>
                          {change}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>
                  Latest events and their performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.attendees}/{event.maxAttendees} attendees
                          </p>
                        </div>
                      </div>
                      <Badge className={cn(
                        event.status === 'completed' ? "status-completed" : 
                        event.status === 'ongoing' ? "status-active" : "status-pending"
                      )}>
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
              <Button onClick={handleCreateEvent} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  showAdminActions={true}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>
                Fill out the form below to create a new campus event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input 
                  placeholder="Enter event title..." 
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe your event..." 
                  rows={4} 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input 
                  placeholder="Event location..." 
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input 
                    placeholder="hackathon, workshop, festival, tech-talk" 
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Attendees</label>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="flex-1" onClick={handleCreateEvent}>Create Event</Button>
                <Button variant="outline" onClick={resetForm}>Clear Form</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;