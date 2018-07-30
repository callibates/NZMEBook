
function test() {
    var com = this.refs.username;
    var value = com.value;
    console.log(value);
}


class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        var com = this.refs.username;
        var value = com.value;
        console.log(value);
    }



    render() {
        return (

            < fieldset >
            < legend > Make a Booking </legend>
        Booker: <
        input
        ref = "booker"
        type = "text"
        onChange = {this.handleInputChange
    }
        />

        < br />
        < br />


        Date: <
        input
        ref = "date"
        type = "date"
        onChange = {this.handleInputChange
    }
        />

        < br />
        < br />

        Time: <
        input
        ref = "time"
        type = "time"
        onChange = {this.handleInputChange
            }
            />

        < br />
        < br />

          <div class = "selection">
          <label for="voice-options">Voice Actor: </label>
        <select name="voiceOption" id="voice-options">
            <option>Any</option>
            <option>Bill Murray</option>
            <option>John Smith</option>
            <option>Jane Doe</option>
        </select>
        </div>

        < br />

        Studio:<
        input
        ref = "Studio 1"
        type = "checkbox"
        onChange = {this.handleInputChange
    }
        />
        Studio 1

        < input
        ref = "Studio 2"
        type = "checkbox"
        onChange = {this.handleInputChange
    }
        />
        Studio 2

        < input
        ref = "Studio 3"
        type = "checkbox"
        onChange = {this.handleInputChange
    }
        />
        Studio 3

        < input
        ref = "Studio 4"
        type = "checkbox"
        onChange = {this.handleInputChange
    }
        />
        Studio 4

        < br />
        < br />

        No. of Scripts: <
        input
        ref = "scripts"
        type = "number"
        onChange = {this.handleInputChange
    }
        />

        < br />
        < br />

        Additional Notes: <
        input
        ref = "scripts"
        type = "text"
        onChange = {this.handleInputChange
    }
        />

        < br />
        < br />
        < button
        onClick = {this.handleInputChange
    }>
        Make Booking
        </button>


        </fieldset>
    )
        ;
    }
}

ReactDOM.render( < Reservation />, document.getElementById('react-root')
)
;

