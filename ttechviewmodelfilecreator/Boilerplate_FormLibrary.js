/**
 * <ENTITYNAME>_FormLibrary
 * 
 * @version 1.0.0.0
 * @author  <AUTHORNAME>
 * @param   {object}    ppLibrary        An instance of the TTechPPLibrary model
 * 
 */

function CreateViewModel(executionContext) {
    var ppLibrary = new TTechPPLibrary(executionContext);
    return <ENTITYNAME>_ViewModel(ppLibrary);
}

function OnLoad(executionContext) {
    const model = createViewModel(executionContext);
    model.OnLoad();
}

function OnSave(executionContext) {
    const model = createViewModel(executionContext);
    model.OnSave();
}