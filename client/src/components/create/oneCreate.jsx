import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PieChart from './pieChart.jsx';
import TotalCalories from './totalCalories.jsx';
import RecipeDesc from './recipeDesc.jsx';
import AddIngredients from './addIngredients.jsx';
import AddInstructions from './addInstructions.jsx';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* NECESSARY FOR DB SAVE */
      title: '',
      ingredients: [{ ndbno: '', quantity: 0, name: '' }], // ingredient list ex: [{ndbno: '808', quantity: 2, name:'spam'}]
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
    this.handleMore = this.handleMore.bind(this);
    this.handleInstructionInput = this.handleInstructionInput.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
  }

  componentDidMount() {
    // this.getAccessToken();
    // this.getProfile();
    // this.setUser();
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

  // setUser() {
  //   let profile = localStorage.getItem('profile');
  //   let profileJSON = JSON.parse(profile);
  //   axios.post('/api/users', {
  //     user: profileJSON.nickname
  //   })
  //   .then(res => {
  //     this.setState({
  //       userId: parseInt(res.data)
  //     })

  //   })
  // }

  handleChange(event) {
    event.preventDefault();
    event.persist();

    // title, description, ing, instr
    let key = event.target.name;
    let value = event.target.value;
    this.setState((state, props) => {
      state[key] = value;
    });
  }

  handleData(data, cb) {
    // can show only top 5

    // create data for chart
    const only = ['291', '205', '268', '203', '204']; // use only major nutrients

    // for state
    let ndbno = [];
    let measure = [];

    const chartData = [];
    let totalCal = 0;

    const sum = {};
    for (let nut of data) {
      ndbno.push(nut.ndbno);
      measure.push(nut.weight);

      for (let obj of nut.nutrients) {
        if (only.includes(obj.nutrient_id)) {
          let name = obj.nutrient;
          let num = isNaN(obj.value) ? 0 : parseFloat(obj.value);

          if (sum[name]) {
            sum[name] += num;
          } else {
            sum[name] = num;
          }

          // total calories
        } else if (obj.nutrient_id === '208') {
          totalCal += parseFloat(obj.value);
        }
      }
    }

    for (let key in sum) {
      chartData.push([key, sum[key]]);
    }

    this.setState(
      {
        ndbno,
        measure,

        chartData,
        totalCal
      },
      () => {
        // last item is always empty --> splice and add new unempty data
        this.setState(
          (state, props) => {
            let n = {
              name: state.ing,
              quantity: state.measure[state.measure.length - 1],
              ndbno: state.ndbno[state.ndbno.length - 1]
            };

            state.ingredients.splice(state.ingredients.length - 1, 1, n);
          },
          () => {
            cb();
          }
        );
      }
    );
  }

  handleInstructionInput(event) {
    this.setState({ instr: event.target.value });
  }

  handleInstructionAdd(event) {
    event.preventDefault();

    this.setState(state => ({
      instructions: [...state.instructions, state.instr]
    }));
  }

  // add more inputs
  handleMore(event) {
    event.preventDefault();
    event.persist();

    if (event.target.name === 'ing') {
      // call api
      axios
        .post('/api/ingredients', { query: this.state.ing })
        .then(res => {
          this.setState(
            {
              nutrients: [...this.state.nutrients, res.data]
            },
            () => {
              this.handleData(this.state.nutrients, () => {
                // add empty
                this.setState({
                  ingredients: [
                    ...this.state.ingredients,
                    { name: '', quantity: 0, ndbno: '' }
                  ]
                });
              });
            }
          );
        })
        .catch(err => {
          console.log('ERROR receiving ingredient data', err);
        });
    }
  }

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
            handleMore={this.handleMore}
          />
          <AddInstructions
            instructions={this.state.instructions}
            handleChange={this.handleInstructionInput}
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
