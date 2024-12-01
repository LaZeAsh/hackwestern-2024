import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface PersonResult {
  photo: string;
  name: string;
  dateOfBirth: string;
  cityOfBirth: string;
}

interface SearchPersonProps {
  onBack?: () => void;
  searchPhoto?: string;
}

const SearchPerson = ({
  onBack = () => {},
  searchPhoto = "",
}: SearchPersonProps) => {
  const [result, setResult] = React.useState<PersonResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const fetchPersonData = async () => {
      if (!searchPhoto) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.post("http://127.0.0.1:5000/detect_face", {
          img_url: searchPhoto
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (isMounted) {
          setResult(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch person data");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPersonData();

    return () => {
      isMounted = false;
    };
  }, [searchPhoto]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return <div>Waiting for photo...</div>;
  }

  return (
    <Card className="w-full max-w-[1000px] p-8 bg-background">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Search Photo</h3>
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={searchPhoto}
                alt="Search"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Match Found</h3>
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={result.photo}
                alt="Match"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xl font-semibold mb-2">{result.name}</p>
              <p className="text-muted-foreground">
                Born: {new Date(result.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-muted-foreground">
                City: {result.cityOfBirth}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={onBack} className="w-48">
            Back to Start
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchPerson;
