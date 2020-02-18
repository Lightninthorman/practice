(function() {
    "use strict";

    function Person(props){
        return(
            <div className="person">
                <h3>
                    {props.person.name}, {props.person.title}
                </h3>

                <p>
                    <img className=" size-medium alignright" src={props.person.img} alt={props.person.name} width="300" height="300"  sizes="(max-width: 300px) 100vw, 300px" />

                    {props.person.bio}
                </p>
            </div>
        )
    }

    function People(props){
        return(
            <div className="results">
            <ReactTransitionGroup.TransitionGroup>
                {props.people.map((person) => {
                    return (
                        <ReactTransitionGroup.CSSTransition key={person.id} classNames={{enter:"animated", enterActive:"zoomIn", exit:"animated", exitActive:"zoomOut"}} timeout={1000}>
                            <Person  person={person} />
                        </ReactTransitionGroup.CSSTransition>
                    )
                })}
            </ReactTransitionGroup.TransitionGroup>
            </div>
        )

    }

    function Filters(props) {
        const titles = window.LMDirectory.titles;

        function updateName(evnt){
            props.updateFormState("currentName",evnt.target.value);
        }

        function updateTitle(evnt){
            props.updateFormState("currentTitle",evnt.target.value);
        }

        function updateIntern(evnt){
            props.updateFormState("isIntern",evnt.target.checked);
        }

        return(
            <form action="" id="directory-filters">
                <div className="group">
                    <label htmlFor="txt-name">Name:</label>
                    <input
                        type="text"
                        name="person_name"
                        value=""
                        placeholder="Name of employee"
                        id="txt-name"
                        value={props.currentName}
                        onChange={updateName}
                    />
                </div>
                <div className="group">
                    <label htmlFor="person-title">Job Title:</label>
                    <select name="person-title" id="person-title" value={props.currentTitle} onChange={updateTitle}>
                        <option value="">- Select -</option>
                        {titles.map((title) => {
                            return(
                                <option value={title.key} key={title.key}>{title.display}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="group">
                    <label><input type="checkbox" value="1" name="person_intern" checked={props.isIntern} onChange={updateIntern}/> Intern</label>
                </div>
                <div className="group">
                    <button type='button' name='reset' onClick={props.resetFormState}>Reset Fields</button>
                </div>
            </form>
        )

    }

    class Directory extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                people:window.LMDirectory.people,
                currentName:"",
                currentTitle:"",
                isIntern:false
            };
            this.updateFormState = this.updateFormState.bind(this);
            this.resetFormState = this.resetFormState.bind(this);
        }

        // search the whole employee list with current filters
        updatePeopleList() {
          var filteredPeople = window.LMDirectory.people.filter(
            function(person) {
              return (
                person.intern === this.state.isIntern &&
                (this.state.currentName === "" ||
                  person.name.toLowerCase().indexOf(this.state.currentName.toLowerCase()) !==
                    -1) &&
                (this.state.currentTitle === "" || person.title_cat === this.state.currentTitle)
              );
            }.bind(this)
          );

          this.setState({
            people: filteredPeople
        });
        }

    updateFormState (name,val){
            this.setState({
                [name]: val
            }, this.updatePeopleList);
        }
    resetFormState (){
        this.setState({
            currentName:"",
            currentTitle:"",
            isIntern:false
        }, this.updatePeopleList)
    }

        render(){
            return(
                <div className="company-directory">
                    <h2>
                        Company Directory
                    </h2>
                    <p>Learn more about each person at Leaf & Mortar in this company directory.</p>

                    <Filters
                        currentName={this.state.currentName}
                        currentTitle={this.state.currentTitle}
                        isIntern={this.state.isIntern}
                        updateFormState={this.updateFormState}
                        resetFormState={this.resetFormState}
                    />

                    <People people={this.state.people}/>
                </div>
            )
        }
    }

    ReactDOM.render(<Directory />, document.getElementById('directory-root'))
})();
