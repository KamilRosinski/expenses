package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SubcategoryWithCategoryDTO {

	private final Long id;

	private final String name;

	private final CategoryDTO category;

}
