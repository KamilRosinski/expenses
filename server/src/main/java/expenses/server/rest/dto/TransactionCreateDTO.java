package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TransactionCreateDTO {

	private final Integer day;

	private final String description;

	private final Long value;

	private final Long monthId;

	private final SubcategoryWithCategoryDTO subcategory;

}
