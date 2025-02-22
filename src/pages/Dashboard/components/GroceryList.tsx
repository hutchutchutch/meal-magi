import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const GroceryList = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Grocery List</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="produce">
          <AccordionTrigger>Produce ($24.50)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Asparagus (1 bunch)</span>
                <span className="text-muted-foreground">$4.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cherry Tomatoes (1 pint)</span>
                <span className="text-muted-foreground">$3.99</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}; 