import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PieChart from './pieChart.jsx';
import TotalCalories from './totalCalories.jsx';
import RecipeDesc from './recipeDesc.jsx';
import AddIngredients from './addIngredients.jsx';
import AddInstructions from './addInstructions.jsx';
import Spinner from './spinner.jsx';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* NECESSARY FOR DB SAVE */
      title: '',
      ingredients: [], // ingredient list ex: [{ndbno: '808', quantity: 2, name:'spam'}]
      instructions: [], // instruction list ex: ['mix', 'sautee']

      userId: '',
      description: '',

      searching: false,
      submit: false, // whether total submit button was clicked

      // handle change
      ing: '', // current ing from onchange
      instr: '', // curr instr from onchange

      totalCal: 0,
      data: [
        {
          label: 'g',
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]] // default data to show
        }
      ]
    };
    this.userProfile;

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
    this.getNDB = this.getNDB.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  componentDidMount() {
    // this.getAccessToken();
    // this.getProfile();
    this.setUser();
  }

  // getAccessToken() {
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     throw new Error('No Access Token found');
  //   }
  //   return accessToken;
  // }

  // getProfile(cb) {
  //   let accessToken = this.getAccessToken();
  //   this.auth0.client.userInfo(accessToken, (err, profile) => {
  //     if (profile) {
  //       this.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }

  setUser() {
    let profile = localStorage.getItem('profile');
    let profileJSON = JSON.parse(profile);
    axios
      .post('/api/users', {
        user: profileJSON.nickname
      })
      .then(res => {
        this.setState({
          userId: parseInt(res.data)
        });
      });
  }

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

  async getNDB(searchTerm) {
    try {
      await this.setState({ searching: true });
      const res = await axios.post('/api/ingredients', { query: searchTerm });
      const data = res.data;
      const only = ['291', '205', '268', '203', '204']; // use only major nutrients

      /* manipulate data */
      const obj = {
        totalCal: 0,
        chartData: [],
        ndbno: data.ndbno,
        name: data.name ? data.name : searchTerm,
        quantity: data.weight
      };

      data.nutrients.forEach(val => {
        if (only.includes(val.nutrient_id)) {
          let name = val.nutrient;
          let num = isNaN(val.value) ? 0 : parseFloat(val.value);
          obj.chartData.push([name, num]);

          // total calories
        } else if (val.nutrient_id === '208') {
          obj.totalCal += parseFloat(val.value);
        }
      });

      /* set state */
      await this.setState(state => {
        const { ndbno, name, quantity } = obj;
        let { chartData, totalCal } = obj;

        if (typeof state.data[0].data[0][0] === 'string') {
          chartData = chartData.map(val => {
            const arr = [];

            state.data[0].data.forEach(tup => {
              if (val[0] === tup[0]) {
                arr.push(val[0]);
                arr.push(val[1] + tup[1]);
              }
            });

            return arr;
          });
        }

        totalCal = state.totalCal + totalCal;

        return {
          ingredients: [...state.ingredients, { quantity, ndbno, name }],
          totalCal,
          data: [
            {
              label: 'g',
              data: chartData
            }
          ],
          searching: false
        };
      });
    } catch (e) {
      console.log('>>> alert should go');
      // alert('Search term doesnt exist');
    }
  }

  handleIngredientAdd(event) {
    event.preventDefault();
    this.getNDB(this.state.ing);
  }

  async submitRecipe() {
    try {
      await this.setState({ submit: true });
      const recipe = Object.assign({}, this.state);
      const res = await axios.post('api/recipes', { recipe });
      await this.props.history.push(`/recipes/${res.data.newRecipeId}`);
    } catch (e) {
      console.error('ERROR while post request for /api/recipes', e);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // event.persist();
    this.submitRecipe();
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
          {this.state.searching ? <Spinner /> : null}
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
