export interface UserInfo {
  height: {
    feet: string;
    inches: string;
  };
  weight: string;
  gender: 'male' | 'female' | 'human';
  city: string;
  state: string;
}

export interface AllergenOption {
  id: string;
  title: string;
  icon: string;
  foods: string[];
}

export interface FormData {
  userInfo: UserInfo;
  allergens: {
    selected: string[];
    custom: string[];
  };
  preferences: {
    liked: string[];
    disliked: string[];
  };
}