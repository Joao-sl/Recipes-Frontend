function formatPreparationTime(
  hours: FormDataEntryValue | null,
  minutes: FormDataEntryValue | null,
) {
  if (!hours && !minutes) return '00:00:00';

  let fHours = hours?.toString().length == 1 ? `0${hours}` : hours;
  let fMinutes = minutes?.toString().length == 1 ? `0${minutes}` : minutes;
  fHours = fHours == null || fHours === '' ? '00' : fHours;
  fMinutes = fMinutes == null || fMinutes === '' ? '00' : fMinutes;

  const minuteAndHours = fHours && fMinutes ? `${fHours}:${fMinutes}:00` : '';
  return minuteAndHours;
}

function formatIngredients(name: FormDataEntryValue[], quantity: FormDataEntryValue[]) {
  if (name.length !== quantity.length) return [];

  const ingredients = name.map((name, index) => {
    return {
      name: name,
      quantity: quantity[index],
    };
  });

  return ingredients;
}

function formatSteps(steps: FormDataEntryValue[]) {
  const preparation_steps = steps.map(step => ({ step: step }));
  return preparation_steps;
}

export function handleRecipePayload(formData: FormData) {
  const title = formData.get('title') || '';
  const description = formData.get('description') || '';
  const preparation_time = formatPreparationTime(formData.get('hours'), formData.get('minutes'));
  const servings = `${formData.get('servings-qty')} ${formData.get('servings-unit')}`;
  const tips = formData.get('tips') || '';
  const categories = formData.getAll('categories') || [];
  const ingredients = formatIngredients(formData.getAll('name'), formData.getAll('quantity'));
  const preparation_steps = formatSteps(formData.getAll('step'));
  const cover = formData.get('cover') || null;

  const data = {
    title,
    description,
    preparation_time,
    servings,
    tips,
    categories,
    ingredients,
    preparation_steps,
    cover,
  };
  return data;
}
