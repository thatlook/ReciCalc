import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PieChart from './pieChart.jsx';
import TotalCalories from './totalCalories.jsx';
import RecipeDesc from './recipeDesc.jsx';
import AddIngredients from './addIngredients.jsx';
import AddInstructions from './addInstructions.jsx';

/* helper functions */
async function getNDB(searchTerm, handleData, cb) {
  try {
    const res = await axios.post('/api/ingredients', { query: searchTerm });
    const data = handleData(res.data, searchTerm);
    cb(data);
  } catch (e) {
    console.log('ERROR receiving ingredient data', e);
  }
}

const handleData = (data, searchTerm) => {
  const only = ['291', '205', '268', '203', '204']; // use only major nutrients

  const obj = {
    totalCal: 0,
    chartData: [],
    ndbno: data.ndbno,
    name: data.name ? data.name : searchTerm,
    quantity: data.weight
  };

  data.nutrients.forEach(val => {
    if (only.includes(val.nutrient_id)) {
      const nutObj = {};

      let name = val.nutrient;
      let num = isNaN(val.value) ? 0 : parseFloat(val.value);

      nutObj[name] = num;
      obj.chartData.push(nutObj);

      // total calories
    } else if (val.nutrient_id === '208') {
      obj.totalCal += parseFloat(val.value);
    }
  });

  return obj;
};

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* NECESSARY FOR DB SAVE */
      title: '',
      ingredients: [], // ingredient list ex: [{ndbno: '808', quantity: 2, name:'spam'}]
      instructions: [], // instruction list ex: ['mix', 'sautee']

      /* OPTIONAL */
      // userId: '',
      description: '',

      // handle change
      ing: '', // current ing from onchange
      instr: '', // curr instr from onchange

      top_ingredients: '', // string to go into db

      // dynamic rendering
      submit: false, // whether total submit button was clicked

      // data from api
      nutrients: [],
      totalCal: 0,
      ndbno: [''],
      measure: [''],

      // chart data
      chartData: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]], // default data to show
      data: [
        {
          label: 'g',
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        }
      ]
    };
    // this.userProfile;

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleMore = this.handleMore.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
  }

  /*
  componentDidMount() {
    this.getAccessToken();
    this.getProfile();
    this.setUser();
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  setUser() {
    let profile = localStorage.getItem('profile');
    let profileJSON = JSON.parse(profile);
    axios.post('/api/users', {
      user: profileJSON.nickname
    })
    .then(res => {
      this.setState({
        userId: parseInt(res.data)
      })

    })
  }
  */

  handleChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    this.setState(state => {
      state[key] = value;
    });
  }

  handleInstructionAdd(event) {
    event.preventDefault();

    this.setState(state => ({
      instructions: [...state.instructions, state.instr]
    }));
  }

  handleIngredientAdd(event) {
    event.preventDefault();

    const cb = (nutrients, sState) => {
      const { name, quantity, ndbno, totalCal, chartData } = nutrients;

      sState(state => {
        const CD = [];
        console.log('>>> chartdata from state', state.chartData);

        chartData.forEach(obj => {
          state.chartData.forEach(tup => {
            if (tup[0] === Object.keys(obj)[0]) {
              CD.push([tup[0], tup[1] + Object.values(obj)[0]]);
            }
          });
        });

        return {
          ingredients: [...state.ingredients, { name, quantity, ndbno }],
          totalCal: state.totalCal + totalCal,
          chartData: CD
        };
      });
    };

    // make api call
    const nutrients = getNDB(this.state.ing, handleData, cb);

    // set state
  }

  // add more inputs
  // handleMore(event) {
  //   event.preventDefault();
  //   event.persist();

  //   if (event.target.name === 'ing') {
  //     // call api
  //     axios
  //       .post('/api/ingredients', { query: this.state.ing })
  //       .then(res => {
  //         this.setState(
  //           {
  //             nutrients: [...this.state.nutrients, res.data]
  //           },
  //           () => {
  //             this.handleData(this.state.nutrients, () => {
  //               // add empty
  //               this.setState({
  //                 ingredients: [
  //                   ...this.state.ingredients,
  //                   { name: '', quantity: 0, ndbno: '' }
  //                 ]
  //               });
  //             });
  //           }
  //         );
  //       })
  //       .catch(err => {
  //         console.log('ERROR receiving ingredient data', err);
  //       });
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();

    this.setState(
      {
        submit: true,
        top_ingredients: this.state.ingredients.reduce((prev, curr, i) => {
          if (i === 0) {
            return prev + curr.ndbno;
          } else {
            return [prev, curr.ndbno].join(', ');
          }
        }, '')
      },
      () => {
        this.setState(
          (state, props) => {
            state.ingredients.pop();
            state.instructions.pop();
          },
          () => {
            const recipe = Object.assign({}, this.state);
            axios
              .post('api/recipes', { recipe })
              .then(res => {
                this.props.history.push(`/recipes/${res.data.newRecipeId}`);
              })
              .catch(err => {
                console.error('ERROR while post request for /api/recipes', err);
              });
          }
        );
      }
    );
  }

  render() {
    return (
      <div id="createWrapper">
        <div id="nuthead" className="nutrients">
          <h2>What's cookin'?</h2>
        </div>

        <div className="nutrients" id="chartNut">
          <PieChart data={this.state.data} />
          <TotalCalories totalCal={this.state.totalCal} />
        </div>

        <form className="nutrients" id="formNut">
          <RecipeDesc handleChange={this.handleChange} />
          <AddIngredients
            ingredients={this.state.ingredients}
            handleChange={this.handleChange}
            handleMore={this.handleIngredientAdd}
          />
          <AddInstructions
            instructions={this.state.instructions}
            handleChange={this.handleChange}
            handleMore={this.handleInstructionAdd}
          />

          <input
            type="submit"
            value="Save Recipe"
            className="button"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
