import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormData } from "../types";
import { US_STATES } from "../constants";

interface PersonalDetailsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PersonalDetailsStep = ({
  formData,
  setFormData,
}: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-6 items-start">
        <div className="space-y-2">
          <Label>Height</Label>
          <div className="flex gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="feet" className="text-sm text-muted-foreground">
                Feet
              </Label>
              <Input
                id="feet"
                type="number"
                min="3"
                max="7"
                placeholder="5"
                value={formData.userInfo.height.feet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userInfo: {
                      ...formData.userInfo,
                      height: {
                        ...formData.userInfo.height,
                        feet: e.target.value,
                      },
                    },
                  })
                }
                className="w-16 text-center"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inches" className="text-sm text-muted-foreground">
                Inches
              </Label>
              <Input
                id="inches"
                type="number"
                min="0"
                max="11"
                placeholder="10"
                value={formData.userInfo.height.inches}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userInfo: {
                      ...formData.userInfo,
                      height: {
                        ...formData.userInfo.height,
                        inches: e.target.value,
                      },
                    },
                  })
                }
                className="w-16 text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Label>Weight</Label>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm text-muted-foreground">
              Pounds
            </Label>
            <Input
              id="weight"
              type="number"
              min="50"
              max="500"
              placeholder="150"
              value={formData.userInfo.weight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userInfo: { ...formData.userInfo, weight: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Tabs
          value={formData.userInfo.gender}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              userInfo: {
                ...formData.userInfo,
                gender: value as 'male' | 'female' | 'human',
              },
            })
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 border rounded-lg p-1 bg-muted/20">
            <TabsTrigger 
              value="male"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
            >
              Male
            </TabsTrigger>
            <TabsTrigger 
              value="female"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
            >
              Female
            </TabsTrigger>
            <TabsTrigger 
              value="human"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
            >
              Human
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            value={formData.userInfo.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                userInfo: { ...formData.userInfo, city: e.target.value },
              })
            }
          />
        </div>

        <div className="w-1/3 space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            value={formData.userInfo.state}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                userInfo: { ...formData.userInfo, state: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};