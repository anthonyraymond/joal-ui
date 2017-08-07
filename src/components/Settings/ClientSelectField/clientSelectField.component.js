// @flow
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

type Props = {
  availableClients: Array<string>,
  selectedClient: string,
  onChange: () => { client: string }
};

const UploadRateFields = (props: Props) => {
  const { availableClients, selectedClient, onChange } = props;

  const valueHasChanged = (newValue) => onChange(newValue);

  return (
    <SelectField
      value={selectedClient}
      onChange={(event, index, value) => valueHasChanged({ client: value })}
      maxHeight={200}
      floatingLabelText="Client"
    >
      {availableClients.map(client => (
        <MenuItem
          key={client}
          value={client}
          primaryText={client.substring(0, client.lastIndexOf('.'))}
        />
      ))}
    </SelectField>
  );
};

export default UploadRateFields;
