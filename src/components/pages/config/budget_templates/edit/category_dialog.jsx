import React                            from 'react';
import Button                           from '@material-ui/core/Button';
import Dialog                           from '@material-ui/core/Dialog';
import DialogActions                    from '@material-ui/core/DialogActions';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import CategoriesSelectableList         from './categories_selectable_list'

const CategoryDialog = (props) => {

  const {
    categoryDialog,
    updateFieldCategories,
    openCategoryList,
    categories,
    categoriesToSave,
    setCategoriesToSave
  } = props

  return (
    <Dialog
    open={categoryDialog}
    onClose={openCategoryList}
    >
      <DialogTitle>
        Selecciona una o varias Categorias
      </DialogTitle>
      <DialogContent>
        <CategoriesSelectableList
          CategoriesSelectableList={ CategoriesSelectableList }
          setCategoriesToSave={ setCategoriesToSave }
          categoriesToSave={ categoriesToSave }
          categories={ categories }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ openCategoryList }> Cancelar </Button>
        <Button onClick={ updateFieldCategories }> Aceptar </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryDialog;
