import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Search } from "lucide-react";

interface ChoiceScreenProps {
  onRegisterNew?: () => void;
  onFindPerson?: () => void;
}

const ChoiceScreen = ({
  onRegisterNew = () => {},
  onFindPerson = () => {},
}: ChoiceScreenProps) => {
  return (
    <Card className="w-full max-w-[800px] p-8 bg-background">
      <div className="grid grid-cols-2 gap-8">
        <Button
          className="h-48 text-xl flex flex-col gap-4 p-8"
          onClick={onRegisterNew}
        >
          <UserPlus className="h-12 w-12" />
          Register New Person
        </Button>

        <Button
          variant="outline"
          className="h-48 text-xl flex flex-col gap-4 p-8"
          onClick={onFindPerson}
        >
          <Search className="h-12 w-12" />
          Find Person
        </Button>
      </div>
    </Card>
  );
};

export default ChoiceScreen;
