/**
 * <ENTITYNAME>_ViewModel
 *
 * This contains the business logic for the form.
 * The functions are invoked by the "_FormLibrary" when the appropriate event is triggered on the form.
 * If any other view model libraries are required, such as the PP library, these are instantiated by the
 * createViewModel() function in the "_FormLibrary" passed as parameters to the view model constructor.
 *
 * @version 1.0.0.0
 * @author  <AUTHORNAME>
 * @param   {object} ppLibrary      An instance of the TTechPPLibrary model
 *
 */

var <ENTITYNAME>_ViewModel = function (ppLibrary) {
    var _model = this;

    //#region Constants

    /** @type {import('../../TTechPPLibrary').TTechPPLibrary} */
    const _ppLibrary = ppLibrary;

    const formStructure = {
        tabs: {
            general: {
                name: "General",
                sections: {
                    generalSection: "general",
                }
            }
        }
    }

    const generalSection = {

    }

    //#endregion

    //#region Logic

    /**
     * Business logic for the on load event. This function will be invoked by the "_FormLibrary".
     *
     * @memberof <ENTITYNAME>_ViewModel
     * @function
     */
    _model.OnLoad = function () {

    }

    /**
     * Business logic for the on change event of the ChangeType Field. This function will be invoked by the "_FormLibrary".
     *
     * @memberof <ENTITYNAME>_ViewModel
     * @function
     */
    _model.ChangeType_OnChange = function () {

    }

    return _model;
}
