import { Storyline } from './types';

export const storylines: Storyline[] = [
  {
    id: 'day-in-life',
    title: 'A Day in the Life',
    description: 'Follow your child through a special day from morning to night',
    fields: [
      {
        id: 'childName',
        label: "Child's Name",
        placeholder: 'e.g., Emma',
        type: 'text',
      },
      {
        id: 'age',
        label: 'Age',
        placeholder: 'e.g., 4',
        type: 'text',
      },
      {
        id: 'mainActivity',
        label: 'Main Activity',
        placeholder: 'e.g., Playing at the park',
        type: 'text',
      },
      {
        id: 'timeOfDay',
        label: 'Time of Day',
        placeholder: 'e.g., Sunny afternoon',
        type: 'text',
      },
      {
        id: 'lesson',
        label: 'Life Lesson',
        placeholder: 'e.g., Kindness, Courage, Friendship',
        type: 'text',
      },
    ],
    generatePages: (values) => [
      `Good morning, ${values.childName}! Today is going to be special.`,
      `${values.childName} is ${values.age} years old and ready for adventure.`,
      `It's a beautiful ${values.timeOfDay}.`,
      `${values.childName} loves to ${values.mainActivity}.`,
      `What an amazing experience!`,
      `${values.childName} made new friends.`,
      `They all played together and had so much fun.`,
      `As the sun sets, ${values.childName} feels happy and tired.`,
      `Today was full of ${values.lesson}.`,
      `Sweet dreams, ${values.childName}! Tomorrow will be another adventure.`,
    ],
  },
  {
    id: 'adventure-journey',
    title: 'Adventure Journey',
    description: 'An exciting quest where your child overcomes challenges',
    fields: [
      {
        id: 'childName',
        label: "Child's Name",
        placeholder: 'e.g., Lucas',
        type: 'text',
      },
      {
        id: 'destination',
        label: 'Destination',
        placeholder: 'e.g., Enchanted Forest, Secret Island',
        type: 'text',
      },
      {
        id: 'companion',
        label: 'Adventure Companion',
        placeholder: 'e.g., Best friend, Pet dog, Robot',
        type: 'text',
      },
      {
        id: 'challenge',
        label: 'Challenge to Overcome',
        placeholder: 'e.g., Finding lost treasure, Helping someone',
        type: 'text',
      },
      {
        id: 'resolution',
        label: 'How They Win',
        placeholder: 'e.g., Using teamwork, Being brave, Problem-solving',
        type: 'text',
      },
    ],
    generatePages: (values) => [
      `${values.childName} discovers an exciting map to ${values.destination}.`,
      `This adventure will be unlike anything before!`,
      `${values.childName} packs supplies and invites ${values.companion}.`,
      `Off they go on their great adventure!`,
      `The journey is long but ${values.childName} stays determined.`,
      `Oh no! They face a big challenge: ${values.challenge}`,
      `But wait... ${values.childName} has an idea!`,
      `Using ${values.resolution}, they save the day!`,
      `${values.destination} is even more beautiful than they imagined.`,
      `${values.childName} and ${values.companion} celebrate their incredible adventure!`,
    ],
  },
  {
    id: 'friendship-story',
    title: 'Friendship Story',
    description: 'A heartwarming tale about friendship and connection',
    fields: [
      {
        id: 'character1',
        label: 'First Character',
        placeholder: 'e.g., Sam',
        type: 'text',
      },
      {
        id: 'character2',
        label: 'Second Character',
        placeholder: 'e.g., Alex',
        type: 'text',
      },
      {
        id: 'setting',
        label: 'Where They Meet',
        placeholder: 'e.g., School, Playground, Library',
        type: 'text',
      },
      {
        id: 'conflict',
        label: 'A Misunderstanding',
        placeholder: 'e.g., Disagreement about a game',
        type: 'text',
      },
      {
        id: 'lesson',
        label: 'What They Learn',
        placeholder: 'e.g., Communication, Forgiveness, Acceptance',
        type: 'text',
      },
    ],
    generatePages: (values) => [
      `${values.character1} and ${values.character2} meet at the ${values.setting}.`,
      `They seem so different, but something special happens.`,
      `They become friends right away!`,
      `Every day they have the most wonderful adventures together.`,
      `But one day, something goes wrong: ${values.conflict}`,
      `${values.character1} and ${values.character2} don't talk for a while.`,
      `Both of them miss their friend so much.`,
      `Then they realize how much their friendship means.`,
      `They learn that true friends understand ${values.lesson}.`,
      `${values.character1} and ${values.character2} are best friends forever!`,
    ],
  },
];

export function getStoryline(id: string): Storyline | undefined {
  return storylines.find((s) => s.id === id);
}
