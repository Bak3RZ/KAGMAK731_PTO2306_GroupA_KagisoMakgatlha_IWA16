/**
 * @param {*} modulo arithmetic operator that returns the remainder or signed remainder of a division, after one number is divided by another (called the modulus of the operation).
 *  the modulo operator can be used with numbers or bigint values.
 * @param {*} integer a unary operator that rounds a number down to the nearest integer. 
 * This is also known as floor rounding, since it rounds the number down to the nearest integer.
 */
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
  
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  };

// Only edit below this comment

/**
 * Define createHTML function that takes a single aurgement 'athlete'.
 * Function exctrates information from 'athlete' object using destructing method.
 */
const createHtml = (athlete) => {
    const { firstName, surname, id, races } = athlete;
    const { date, time } = races[races.length - 1];

    /**
     * Store the new DocumentFragment in a constant variable named fragment. 
     * This variable can be used later to append or insert child nodes into the fragment.
     *  */ 
    const fragment = document.createDocumentFragment(); // Document objec that returns a new, empty DocumentFragment.
  
    /**
     * Create a new heading 
     */
    const title = document.createElement('h2'); 
    title.textContent = id; // set text content to the value of id
    fragment.appendChild(title); // Append title to fragment element which is a container for mutilples nodes.
  
    const list = document.createElement('dl'); // create defenition list 

  /**
   * Create a new JavaScript Date object from the provided date variable.
   * Extract the day, month, and year components from the date.
   * Store them in separate variables.
   */
    const raceDate = new Date(date); // create new date 
    const day = raceDate.getDate(); // retrieve day from raceDate and stre in const day variable 
    const month = MONTHS[raceDate.getMonth()]; // retrieve month and use it as an index to access the corresponding month name in the MONTHS array
    const year = raceDate.getFullYear(); // retreive specific year from raceDate and store in const year variable
  
     // Calculate the total racetime in hours and minutes
    const total = time.reduce((acc, lapTime) => acc + lapTime, 0); // reduce iterates over each element in time and adds it to 'acc' variable. It reurns the local time in minutes. 
    const hours = Math.floor(total / 60); // calculate the  total race time using in hours using integer division to round off result. 
    const minutes = total % 60; // calculate remaining minutes after calculating total race time using modulo operator.
  
    /** code generates a dynamic HTML structure that displays information about an athlete.
     * creates an HTML structure inside a JavaScript template literal, using embedded expressions.
     * starts with the syntax html.
     * firstName and surname variables are used to create the text for the "Athlete" list item.
     * races.length expression is used to create the text for the "Total Races" list item.
     * There is string manipulation method to convert 'hours' and 'minutes' variables inot strings and pad them.
     * code appends the created HTML fragment to a new document fragment (fragment) using the appendChild() method.
     */
    list.innerHTML = /* html */ `
      <dt>Athlete</dt>
      <dd>${firstName} ${surname}</dd>
  
      <dt>Total Races</dt>
      <dd>${races.length}</dd>
  
      <dt>Event Date (Latest)</dt>
      <dd>${day} ${month} ${year}</dd>
  
      <dt>Total Time (Latest)</dt>
      <dd>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</dd>
    `;
  
    fragment.appendChild(list);
    return fragment;
  };

const { NM372, SV782 } = data.response.data;
// destruct the above properties and create an array below that contains the two const objects from above.
const athletes = [NM372, SV782];

/**
 * iterate over each athlete object in the athletes array.
 * forEach loop selects container element from DOM using document.querySelector method
 * data-athlete attribute is used to find the container element that corresponds to the current athlete object.
 * forEach then calls createHTML() with current athlete object as its argument to display athlete inoformation.
 * forEach then appends the HTML structure generated by the createHtml() function to the container element using the appendChild() method.
 */
athletes.forEach((athlete) => {
    const container = document.querySelector(`[data-athlete="${athlete.id}"]`);
    container.appendChild(createHtml(athlete));
  });

  /**
   * 
   */