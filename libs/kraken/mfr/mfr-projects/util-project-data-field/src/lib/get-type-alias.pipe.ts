import { Pipe, PipeTransform } from '@angular/core';

import { ProjectDataFieldType } from '@kraken/domain';

const aliases: Record<ProjectDataFieldType, string> = {
  [ProjectDataFieldType.number]: 'Число',
  [ProjectDataFieldType.string]: 'Текст',
  [ProjectDataFieldType.select]: 'Список',
};

@Pipe({
  name: 'getTypeAlias',
})
export class GetTypeAliasPipe implements PipeTransform {
  transform(type: ProjectDataFieldType): string {
    return aliases[type];
  }
}
