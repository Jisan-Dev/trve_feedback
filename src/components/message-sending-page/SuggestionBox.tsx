import { LoaderPinwheel } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface SuggestionBoxProps {
  showSuggestions: boolean;
  suggestionRef: React.RefObject<HTMLDivElement>;
  isSuggestLoading: boolean;
  handleMessageClick: (message: string) => void;
  generatedMsg: string;
}

export default function SuggestionBox(props: SuggestionBoxProps) {
  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split("||");
  };

  return (
    <>
      <p className={` ${props?.showSuggestions ? "block" : "hidden"} !mt-12`}>
        Click on any message below to select it.
      </p>
      <Card ref={props?.suggestionRef} className="min-h-[266px]">
        <CardHeader>
          <h3 className="text-xl font-semibold">Messages</h3>
        </CardHeader>
        {props?.isSuggestLoading ? (
          <div className="w-full flex items-center justify-center mb-2">
            <LoaderPinwheel className="animate-spin" />
          </div>
        ) : (
          <CardContent className="flex flex-col space-y-4">
            {parseStringMessages(props?.generatedMsg).map((message, index) => (
              <p
                key={index}
                className="mb-2 border cursor-pointer rounded-lg border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 text-center"
                onClick={() => props?.handleMessageClick(message)}
              >
                {message}
              </p>
            ))}
          </CardContent>
        )}
      </Card>
    </>
  );
}
