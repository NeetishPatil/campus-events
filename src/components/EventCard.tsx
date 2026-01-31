import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'hackathon' | 'workshop' | 'festival' | 'tech-talk';
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
  organizer: string;
}

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  onViewDetails?: (eventId: string) => void;
  isRegistered?: boolean;
  showAdminActions?: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard = ({ 
  event, 
  onRegister, 
  onViewDetails, 
  isRegistered = false,
  showAdminActions = false,
  onEdit,
  onDelete 
}: EventCardProps) => {
  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'hackathon': return 'bg-accent text-accent-foreground';
      case 'workshop': return 'bg-primary text-primary-foreground';
      case 'festival': return 'bg-success text-white';
      case 'tech-talk': return 'bg-info text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return <Badge className="status-pending">Upcoming</Badge>;
      case 'ongoing': return <Badge className="status-active">Ongoing</Badge>;
      case 'completed': return <Badge className="status-completed">Completed</Badge>;
      default: return null;
    }
  };

  const isEventFull = event.attendees >= event.maxAttendees;
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="event-card group bg-card border border-border rounded-xl overflow-hidden shadow-soft">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {getStatusBadge(event.status)}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={getCategoryColor(event.category)}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{event.date} at {event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span>{event.attendees}/{event.maxAttendees} attendees</span>
            </div>
            
            {/* Attendance Progress */}
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-300",
                    attendancePercentage >= 90 ? "bg-accent" : "bg-primary"
                  )}
                  style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(attendancePercentage)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>Organized by {event.organizer}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showAdminActions ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit?.(event.id)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete?.(event.id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewDetails?.(event.id)}
                className="flex-1"
              >
                View Details
              </Button>
              
              {event.status === 'upcoming' && (
                <Button 
                  size="sm"
                  onClick={() => onRegister?.(event.id)}
                  disabled={isEventFull || isRegistered}
                  className={cn(
                    isRegistered && "bg-success hover:bg-success/90"
                  )}
                >
                  {isRegistered ? 'Registered' : isEventFull ? 'Full' : 'Register'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;